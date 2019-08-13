export function now() {
  return Date.now() / 1000;
}

export class WaitListEntry {
  constructor(promise, cancel) {
    this.promise = promise;
    this.cancel = cancel;
  }
}

export class WaitList {
  constructor() {
    this.map = new Map();
  }

  wait(id) {
    let elem = null;

    const promise = new Promise((resolve, reject) => {
      elem = {
        resolve: (result) => {
          this.map.delete(id);
          resolve(result);
        },
        reject: (error) => {
          this.map.delete(id);
          reject(error);
        }
      };
      this.map.set(id, elem);
    });

    const cancel = () => {
      if (!this.map.has(id)) {
        return;
      }

      elem.reject(new Error('Cancelled'));
    };

    return new WaitListEntry(promise, cancel);
  }

  resolve(id, result) {
    if (!this.map.has(id)) {
      return;
    }

    this.map.get(id).resolve(result);
  }

  static resolve(value) {
    return { promise: Promise.resolve(value), cancel() {} };
  }
}
