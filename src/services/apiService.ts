import type { Usuario } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const apiService = {
  async buscarUsuarios(): Promise<Usuario[]> {
    const response = await fetch(`${API_BASE_URL}/usuarios`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return response.json();
  },

  async buscarUsuarioPorCredenciais(nomeUsuario: string, email: string): Promise<Usuario | null> {
    const usuarios = await this.buscarUsuarios();
    return usuarios.find(
      usuario => usuario.nomeUsuario === nomeUsuario && usuario.email === email
    ) || null;
  },

  async verificarDuplicidade(nomeUsuario: string, email: string): Promise<{ nomeUsuarioExiste: boolean; emailExiste: boolean }> {
    const usuarios = await this.buscarUsuarios();
    const nomeUsuarioExiste = usuarios.some(usuario => usuario.nomeUsuario === nomeUsuario);
    const emailExiste = usuarios.some(usuario => usuario.email === email);
    return { nomeUsuarioExiste, emailExiste };
  },

  async criarUsuario(dadosUsuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }

    return response.json();
  },
};
