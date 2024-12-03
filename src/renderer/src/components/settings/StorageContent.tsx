import { FaFolder } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useSettingsList } from './SettingsProvider';

export const StorageContent = () => {
  const { setStorage, storage: currentStoragePath } = useSettingsList();

  const handleChange = async () => {
    const path = await window.context.changeLocation();
    setStorage(path);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Storage Location</h2>

        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaFolder className="w-10 h-10" />
            <div>
              <p className="font-medium">Current Storage Path</p>
              <p className="text-sm">{currentStoragePath}</p>
            </div>
          </div>

          <button
            className="px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
            onClick={handleChange}
          >
            <MdEdit className="w-5 h-5" />
            <span>Change Location</span>
          </button>
        </div>

        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Storage Guidelines</h3>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mt-1" />
              <span>Choose a location with sufficient disk space</span>
            </li>
            <li className="flex items-start space-x-2">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mt-1" />
              <span>Ensure you have write permissions to the selected folder</span>
            </li>
            <li className="flex items-start space-x-2">
              <BsCheckCircleFill className="w-5 h-5 text-green-500 mt-1" />
              <span>Avoid changing storage location frequently</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}