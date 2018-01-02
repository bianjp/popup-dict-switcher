const St = imports.gi.St;
const Gtk = imports.gi.Gtk;
const Main = imports.ui.main;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const PopupDict = Me.imports.popup_dict;
const Notification = Me.imports.notification;

let button, icon;
let is_running = false;

function get_icon_name() {
  let name = 'popup-dict';
  if (!is_running) {
    name += '-disabled';
  }
  return name;
}

// 更新 button, icon 状态
function update_status() {
  icon.set_icon_name(get_icon_name());
}

// switch popup-dict on/off
function toggle_popup_dict() {
  if (is_running) {
    PopupDict.stop(function(error) {
      if (error) {
        Notification.show_error(error);
      } else {
        is_running = false;
        Notification.show_success('划词翻译：关闭');
      }
      update_status();
    });
  } else {
    PopupDict.start(function(error) {
      if (error) {
        Notification.show_error(error);
      } else {
        is_running = true;
        Notification.show_success('划词翻译：开启');
      }
      update_status();
    });
  }
}

function init(metadata) {
  Gtk.IconTheme.get_default().append_search_path(metadata.path + '/icons');

  button = new St.Bin({
    style_class: 'panel-button',
    reactive: true,
  });

  icon = new St.Icon({
    icon_name: get_icon_name(),
    style_class: 'system-status-icon',
  });

  button.set_child(icon);
  button.connect('button-press-event', toggle_popup_dict);
}

// 解锁屏幕时也会触发
function enable() {
  // 恢复禁用前的运行状态
  if (is_running) {
    PopupDict.start(function(error) {
      is_running = !error;
      update_status();
    });
  } else {
    is_running = PopupDict.is_running();
    update_status();
  }
  Main.panel._rightBox.insert_child_at_index(button, 0);
}

// 锁屏时也会触发
function disable() {
  PopupDict.stop();
  Main.panel._rightBox.remove_child(button);
}
