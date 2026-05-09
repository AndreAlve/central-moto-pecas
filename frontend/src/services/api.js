// services/api.js
// Centraliza todas as chamadas à API do backend
// Assim se a URL mudar, você só altera aqui

const BASE = '/api'; // O vite.config.js redireciona para http://localhost:3001

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.erro || 'Erro na requisição');
  return data;
}

// ── Clientes ──────────────────────────────────────────────────
export const getClientes    = ()       => req('/clientes');
export const getCliente     = (id)     => req(`/clientes/${id}`);
export const criarCliente   = (dados)  => req('/clientes', { method: 'POST', body: JSON.stringify(dados) });
export const editarCliente  = (id, d)  => req(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(d) });
export const deletarCliente = (id)     => req(`/clientes/${id}`, { method: 'DELETE' });

// ── Motos ─────────────────────────────────────────────────────
export const getMotos    = ()      => req('/motos');
export const getMoto     = (id)    => req(`/motos/${id}`);
export const criarMoto   = (dados) => req('/motos', { method: 'POST', body: JSON.stringify(dados) });
export const editarMoto  = (id, d) => req(`/motos/${id}`, { method: 'PUT', body: JSON.stringify(d) });
export const deletarMoto = (id)    => req(`/motos/${id}`, { method: 'DELETE' });

// ── Funcionários ──────────────────────────────────────────────
export const getFuncionarios    = ()      => req('/funcionarios');
export const criarFuncionario   = (dados) => req('/funcionarios', { method: 'POST', body: JSON.stringify(dados) });
export const editarFuncionario  = (id, d) => req(`/funcionarios/${id}`, { method: 'PUT', body: JSON.stringify(d) });
export const deletarFuncionario = (id)    => req(`/funcionarios/${id}`, { method: 'DELETE' });

// ── Peças ─────────────────────────────────────────────────────
export const getPecas    = ()      => req('/pecas');
export const criarPeca   = (dados) => req('/pecas', { method: 'POST', body: JSON.stringify(dados) });
export const editarPeca  = (id, d) => req(`/pecas/${id}`, { method: 'PUT', body: JSON.stringify(d) });
export const deletarPeca = (id)    => req(`/pecas/${id}`, { method: 'DELETE' });

// ── Ordens de Serviço ─────────────────────────────────────────
export const getOrdens    = ()        => req('/ordens');
export const getOrdem     = (id)      => req(`/ordens/${id}`);
export const criarOrdem   = (dados)   => req('/ordens', { method: 'POST', body: JSON.stringify(dados) });
export const atualizarStatus = (id,d) => req(`/ordens/${id}/status`, { method: 'PATCH', body: JSON.stringify(d) });
export const deletarOrdem = (id)      => req(`/ordens/${id}`, { method: 'DELETE' });
