import { Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm text-slate-500">Bem-vindo de volta</p>
          <h1 className="text-lg font-semibold text-slate-900">LionStock</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="hidden lg:block">Sistema de Gestão de Estoque</span>
      </div>
    </header>
  );
};

export default Header;
