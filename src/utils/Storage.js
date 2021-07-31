/* Local Storage getter, setter, remove */

const Storage = {
  set: (key, object) => {
    if (!localStorage) return;
    localStorage[key] = typeof object === 'string' ? object : JSON.stringify(object);
  },
  get: (key) => {
    if (!localStorage) return null;

    if (!localStorage[key]) {
      return null;
    }

    try {
      const parsed = JSON.parse(localStorage[key]);
      return parsed;
    } catch (e) {
      return localStorage[key];
    }
  },
  // eslint-disable-next-line consistent-return
  remove: (key) => {
    if (!localStorage) return null;

    if (localStorage[key]) {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    localStorage.clear();
  },
};

export default Storage;
