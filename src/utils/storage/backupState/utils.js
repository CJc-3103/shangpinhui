import { getItem, setItem, removeItem } from '../utils'

const getBackupLocal = (backupKey) => {
    return JSON.parse(getItem(backupKey));
}
const setBackupLocal = (backupKey, datas) => {
    setItem(backupKey, JSON.stringify(datas));
}
const removeBackupLocal = (backupKey) => removeItem(backupKey);

export { getBackupLocal, setBackupLocal, removeBackupLocal }