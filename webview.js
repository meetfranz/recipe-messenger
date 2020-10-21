module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const messengerIframe = document.querySelector('iframe[src^="https://www.facebook.com/messages"]');
    if (messengerIframe) {
      window.location.href = messengerIframe.src;
    }

    let count = document.querySelectorAll('._5fx8:not(._569x),._1ht3:not(._569x)').length;
    const messageRequestsElement = document.querySelector('._5nxf');
    if (messageRequestsElement) {
      count += parseInt(messageRequestsElement.innerHTML, 10);
    }

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
};
