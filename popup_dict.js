const GLib = imports.gi.GLib;

const PID_FILE = GLib.get_user_cache_dir() + '/popup-dict/popup-dict.pid';

// 从 pid 文件读取 pid
function read_pidfile() {
  try {
    let [ok, content] = GLib.file_get_contents(PID_FILE)
    if (ok) {
      return +content.toString();
    }
  } catch (e) {
  }

  return null;
}

// 检查是否正在运行
function is_running(pid = null) {
  pid = pid || read_pidfile();
  if (!pid) {
    return false;
  }

  try {
    let [ok, std_out, std_err, exit_status] = GLib.spawn_command_line_sync('ps --format cmd -h ' + pid)
    if (ok && exit_status === 0) {
      return !!std_out && std_out.toString().indexOf('popup-dict') !== -1;
    }
  } catch (e) {
  }

  return false;
}

// 启动
function start(callback) {
  callback = callback || function(){};
  let pid = read_pidfile();
  if (pid && is_running(pid)) {
    callback();
  }

  let error = null;

  try {
    let ok = GLib.spawn_command_line_async('popup-dict');

    if (!ok) {
      error = '启动失败';
    }
  } catch (e) {
    error = e.message || '启动失败';
  }

  if (error) {
    callback(error);
    return;
  }

  // 检查是否启动成功
  // 启动命令是异步调用的，因此需等待一段时间再检查
  // 延时不能过小
  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 400, function(){
    if (is_running()) {
      callback();
    } else {
      // 启动命令的输出(stdout, stderr)可能会很长，不便显示
      callback('启动失败');
    }

    // 不返回 false 会一直重复执行
    return false;
  });
}

// 关闭
function stop(callback) {
  callback = callback || function(){};
  let pid = read_pidfile();
  if (!is_running(pid)) {
    callback();
  }

  let error = null;
  try {
    let [ok, std_out, std_err, exit_status] = GLib.spawn_command_line_sync('kill ' + pid);
    if (ok && exit_status === 0) {
      pid = null;
    } else {
      error = (std_err && std_err.toString()) || (std_out && std_out.toString()) || '关闭失败';
    }
  } catch (e) {
    error = e.message || '关闭失败';
  }

  // 进程不存在视为成功
  if (error && error.indexOf('No such process') === -1) {
    callback(error);
  } else {
    callback();
  }
}
