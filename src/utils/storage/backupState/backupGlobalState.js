import store from '@/store'
import { getBackupLocal, setBackupLocal, removeBackupLocal } from './utils'

const backupKey = 'backupGlobalState';
const recoverGlobalStateLocal = () => {
    const backup = getBackupLocal(backupKey);
    if (backup) {
        store.replaceState(Object.assign({}, store.state, backup));
    }
}
const setGlobalStateLocal = () => {
    setBackupLocal(backupKey, store.state);
}
const removeGlobalStateLocal = () => removeBackupLocal(backupKey);

export { recoverGlobalStateLocal, setGlobalStateLocal, removeGlobalStateLocal }