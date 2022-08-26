import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;
    document.querySelectorAll('[data-testid="mwthreadlist-item"]').forEach((node) => {
      if (node.querySelector('.lrazzd5p, .is6700om, .o48pnaf2')) count += 1;
    });

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);

  /* Enable desktop notifications in messenger settings */
  localStorage.setItem('_cs_desktopNotifsEnabled', JSON.stringify({ __t: new Date().getTime(), __v: true }));

  if (typeof Franz.onNotify === 'function') {
    Franz.onNotify((notification) => {
      if (typeof notification.title !== 'string') {
        notification.title = ((notification.title.props || {}).content || [])[0] || 'Messenger';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body = (((notification.options.body || {}).props || {}).content || [])[0] || '';
      }

      return notification;
    });
  }

  Franz.injectCSS(path.join(__dirname, 'service.css'));
};
