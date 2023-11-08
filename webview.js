import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;
    document.querySelectorAll('[data-testid="mwthreadlist-item"]').forEach((node) => {
      if (node.querySelector('.lrazzd5p, .is6700om, .o48pnaf2')) count += 1;
    });

    count += document.querySelectorAll('[role="gridcell"] .xwnonoy, [role="gridcell"] .x107p15e').length;

    Franz.setBadge(count);
  };

  Franz.loop(getMessages);

  /* Fixes links to be opened directly without prompt that user is leaving Facebook */
  const fixLinks = function fixLinks() {
    const links = document.querySelectorAll('a[data-lynx-uri]');
    links.forEach(link => {
      link.setAttribute('data-lynx-uri', link.href);
    });
  };

  Franz.loop(fixLinks);

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
