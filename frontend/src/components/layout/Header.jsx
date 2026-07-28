import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Search, X, AlertTriangle, PackageX } from 'lucide-react';
import { extractListData } from '../../services/api';
import { productService } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const LOW_STOCK_THRESHOLD = 5;

const Header = ({ onMenuClick }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getAll()
      .then((res) => {
        const products = extractListData(res, []);
        setAlerts(products);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (search.trim().length < 2) { setResults([]); return; }
    const q = search.toLowerCase();
    const filtered = alerts.filter((p) =>
      p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 8));
  }, [search, alerts]);

  const outOfStock = alerts.filter((p) => (p.quantity ?? 0) <= 0);
  const lowStock = alerts.filter((p) => {
    const q = p.quantity ?? 0;
    return q > 0 && q <= LOW_STOCK_THRESHOLD;
  });

  const notifCount = outOfStock.length + lowStock.length;

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
          <p className="text-sm text-slate-500">Sistema de Gestão de Estoque</p>
          <h1 className="text-lg font-semibold text-slate-900">LionStock</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={searchRef}>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-44 bg-transparent text-sm outline-none"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
              onFocus={() => { if (results.length) setShowResults(true); }}
            />
            {search && (
              <button onClick={() => { setSearch(''); setResults([]); setShowResults(false); }} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {showResults && results.length > 0 && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white py-2 shadow-soft">
              {results.map((p) => (
                <button
                  key={p._id}
                  className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-slate-50"
                  onClick={() => { navigate('/products'); setSearch(''); setShowResults(false); }}
                >
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="text-xs text-slate-400">SKU: {p.sku}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
          >
            <Bell className="h-5 w-5" />
            {notifCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notifCount}
              </span>
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white py-2 shadow-soft">
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Alertas de Estoque</div>
              {notifCount === 0 && (
                <div className="px-4 py-6 text-center text-sm text-slate-500">Nenhum alerta no momento.</div>
              )}
              {outOfStock.length > 0 && (
                <div className="px-4 py-2">
                  <p className="mb-1 text-xs font-semibold text-red-600">Sem estoque</p>
                  {outOfStock.map((p) => (
                    <div key={p._id} className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                      <PackageX className="h-4 w-4 shrink-0" />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {lowStock.length > 0 && (
                <div className="px-4 py-2">
                  <p className="mb-1 text-xs font-semibold text-amber-600">Estoque baixo</p>
                  {lowStock.map((p) => (
                    <div key={p._id} className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{p.name} ({p.quantity} unid.)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
