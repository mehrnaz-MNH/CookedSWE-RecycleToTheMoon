'use client';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  currentAvatar: string;
  availableAvatars: string[];
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

export default function AvatarSelectionModal({
  isOpen,
  currentAvatar,
  availableAvatars,
  onClose,
  onSelectAvatar,
}: AvatarSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Choose Avatar
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {availableAvatars.map((avatar) => (
            <button
              key={avatar}
              onClick={() => onSelectAvatar(avatar)}
              className={`aspect-square rounded-xl flex items-center justify-center text-4xl transition-all hover:scale-110 ${
                currentAvatar === avatar
                  ? 'bg-green-100 dark:bg-green-900 ring-2 ring-green-600'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
