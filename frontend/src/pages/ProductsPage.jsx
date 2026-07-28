import { useEffect, useState } from 'react';
import { Boxes, Pencil, Trash2, Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StateView from '../components/common/StateView';
import Modal from '../components/ui/Modal';
import { extractListData } from '../services/api';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { supplierService } from '../services/supplierService';

const emptyForm = { sku: '', name: '', description: '', category: '', supplier: '', quantity: 0, unitPrice: 0 };

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = async () => {
    try {
      const [pRes, cRes, sRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
        supplierService.getAll(),
      ]);
      setProducts(extractListData(pRes, []));
      setCategories(extractListData(cRes, []));
      setSuppliers(extractListData(sRes, []));
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setModal('create'); setFormError(''); };
  const openEdit = (p) => { setForm({ sku: p.sku || '', name: p.name || '', description: p.description || '', category: p.category?._id || p.category || '', supplier: p.supplier?._id || p.supplier || '', quantity: p.quantity ?? 0, unitPrice: p.unitPrice ?? 0 }); setModal('edit'); setFormError(''); };
  const openDelete = (p) => { setForm(p); setModal('delete'); };

  const handleSave = async () => {
    setSaving(true);
    setFormError('');
    try {
      if (modal === 'create') {
        await productService.create(form);
      } else {
        await productService.update(form._id, form);
      }
      setModal(null);
      await load();
    } catch (err) {
      setFormError(err?.response?.data?.message || err?.response?.data?.errors?.[0]?.message || 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await productService.remove(form._id);
      setModal(null);
      await load();
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Erro ao excluir.');
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div>
      <PageHeader title="Produtos" description="Gerencie o estoque de produtos." action={
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-2xl bg-lion-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Novo Produto
        </button>
      } />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-soft">Carregando...</div>
      ) : error ? (
        <StateView title="Erro" description={error} icon={Boxes} />
      ) : products.length === 0 ? (
        <StateView title="Sem produtos" description="Nenhum produto cadastrado." icon={Boxes} />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">SKU</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Nome</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Categoria</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Fornecedor</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Qtd</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Preço</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-3 font-mono text-slate-600">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600">{p.category?.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.supplier?.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{p.quantity}</td>
                  <td className="px-4 py-3 text-slate-600">R$ {(p.unitPrice || 0).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => openDelete(p)} className="rounded-xl p-2 text-red-400 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal === 'create' || modal === 'edit' ? (
        <Modal title={modal === 'create' ? 'Novo Produto' : 'Editar Produto'} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <input placeholder="SKU" value={form.sku} onChange={set('sku')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue" />
            <input placeholder="Nome" value={form.name} onChange={set('name')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue" />
            <textarea placeholder="Descrição" value={form.description} onChange={set('description')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue" rows={2} />
            <select value={form.category} onChange={set('category')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue">
              <option value="">Selecione a categoria</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select value={form.supplier} onChange={set('supplier')} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue">
              <option value="">Selecione o fornecedor</option>
              {suppliers.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <input type="number" placeholder="Quantidade" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: Number(e.target.value) }))} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue" />
            <input type="number" placeholder="Preço unitário" value={form.unitPrice} onChange={(e) => setForm((p) => ({ ...p, unitPrice: Number(e.target.value) }))} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-lion-blue" />
            {formError && <p className="text-sm text-red-500">{formError}</p>}
            <button onClick={handleSave} disabled={saving} className="w-full rounded-xl bg-lion-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </Modal>
      ) : null}

      {modal === 'delete' ? (
        <Modal title="Excluir Produto" onClose={() => setModal(null)}>
          <p className="text-sm text-slate-600">Tem certeza que deseja excluir <strong>{form.name}</strong>?</p>
          {formError && <p className="mt-2 text-sm text-red-500">{formError}</p>}
          <div className="mt-4 flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancelar</button>
            <button onClick={handleDelete} disabled={saving} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">
              {saving ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ProductsPage;
