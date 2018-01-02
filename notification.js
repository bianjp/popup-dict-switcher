const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let label = null;

function hide_notification() {
  if (label) {
    Main.uiGroup.remove_actor(label);
    label = null;
  }
}

function show_notification(success, text) {
  if (label) {
    // 取消未完成的动画
    Tweener.removeTweens(label);
  }
  else {
    label = new St.Label();
    Main.uiGroup.add_actor(label);
  }

  label.set_opacity(255);
  label.set_style_class_name('notification ' + (success ? 'success' : 'failure'));
  label.set_text(text);

  let monitor = Main.layoutManager.primaryMonitor;
  label.set_position(monitor.x + Math.floor(monitor.width / 2 - label.width / 2),
                     monitor.y + Math.floor(monitor.height / 2 - label.height / 2));

  Tweener.addTween(label, {
    opacity: 0,
    time: success ? 2 : 5,
    transition: 'easeInExpo',
    onComplete: hide_notification,
  });
}

function show_success(text) {
  show_notification(true, text);
}

function show_error(text) {
  show_notification(false, text);
}
