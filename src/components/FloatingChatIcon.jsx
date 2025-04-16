// components/FloatingChatIcon.jsx
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FloatingChatIcon() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/contact')}
      className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-300 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
      aria-label="Contact Us"
    >
      <MessageCircle className="w-6 h-6 text-black" />
    </button>
  );
}
