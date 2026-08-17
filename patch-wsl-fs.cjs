const fs = require('fs');

const origCopyFileSync = fs.copyFileSync;
fs.copyFileSync = function (src, dest, mode) {
  try {
    return origCopyFileSync.call(fs, src, dest, mode);
  } catch (err) {
    if (err && (err.code === 'EPERM' || err.code === 'EXDEV' || err.code === 'EINVAL')) {
      const data = fs.readFileSync(src);
      fs.writeFileSync(dest, data);
      return;
    }
    throw err;
  }
};

const origCopyFile = fs.copyFile;
fs.copyFile = function (src, dest, mode, callback) {
  if (typeof mode === 'function') {
    callback = mode;
    mode = 0;
  }
  try {
    origCopyFile.call(fs, src, dest, mode, (err) => {
      if (err && (err.code === 'EPERM' || err.code === 'EXDEV' || err.code === 'EINVAL')) {
        try {
          fs.writeFileSync(dest, fs.readFileSync(src));
          return callback(null);
        } catch (writeErr) {
          return callback(writeErr);
        }
      }
      return callback(err);
    });
  } catch (err) {
    if (err && (err.code === 'EPERM' || err.code === 'EXDEV' || err.code === 'EINVAL')) {
      fs.writeFileSync(dest, fs.readFileSync(src));
      return callback(null);
    }
    throw err;
  }
};

if (fs.promises && fs.promises.copyFile) {
  const origPromisesCopyFile = fs.promises.copyFile;
  fs.promises.copyFile = async function (src, dest, mode) {
    try {
      return await origPromisesCopyFile.call(fs.promises, src, dest, mode);
    } catch (err) {
      if (err && (err.code === 'EPERM' || err.code === 'EXDEV' || err.code === 'EINVAL')) {
        const data = await fs.promises.readFile(src);
        await fs.promises.writeFile(dest, data);
        return;
      }
      throw err;
    }
  };
}
