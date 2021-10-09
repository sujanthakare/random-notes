const storage = chrome.storage;

export const setData = (key: string, data: string, callback?: () => void) => {
  storage.sync.set({ [key]: data }, () => {
    callback && callback();
    console.log("Data saved");
  });
};

export const getData = (key: string, callback: (data: string) => void) => {
  storage.sync.get([key], (data) => {
    callback(data[key]);
  });
};
