import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { CadastroFormData } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [erroCadastro, setErroCadastro] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>();

  const onSubmit = async (data: CadastroFormData) => {
    try {
      setErroCadastro('');
      
      const { nomeUsuarioExiste, emailExiste } = await apiService.verificarDuplicidade(
        data.nomeUsuario,
        data.email
      );

      if (nomeUsuarioExiste) {
        setErroCadastro('Nome de usuário já está em uso.');
        return;
      }

      if (emailExiste) {
        setErroCadastro('Email já está em uso.');
        return;
      }

      const novoUsuario = await apiService.criarUsuario({
        nome: data.nome,
        nomeUsuario: data.nomeUsuario,
        email: data.email,
      });

      login(novoUsuario);
      navigate('/dashboard');
    } catch (error) {
      setErroCadastro('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Crie sua conta
            </h1>
            <p className="text-gray-500 text-sm">
              Junte-se a nós e comece sua jornada
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  {...register('nome', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres',
                    },
                  })}
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 bg-white text-sm"
                  placeholder="Digite seu nome completo"
                />
                {errors.nome && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome de Usuário
                </label>
                <input
                  {...register('nomeUsuario', {
                    required: 'Nome de usuário é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'Nome de usuário deve ter pelo menos 3 caracteres',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+$/,
                      message: 'Nome de usuário pode conter apenas letras, números, pontos, hífens e underscores',
                    },
                  })}
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 bg-white text-sm"
                  placeholder="Escolha um nome de usuário"
                />
                {errors.nomeUsuario && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.nomeUsuario.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  })}
                  type="email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 bg-white text-sm"
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {erroCadastro && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{erroCadastro}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Criando conta...
                </span>
              ) : (
                'Criar conta'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
