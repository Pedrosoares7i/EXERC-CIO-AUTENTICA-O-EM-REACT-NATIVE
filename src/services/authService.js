const EMAIL_VALIDO = "aluno@etec.sp.gov.br";
const SENHA_VALIDA = "pam2026";

const USUARIO = {
  id: 1,
  nome: "João da Silva",
  email: "aluno@etec.sp.gov.br",
  curso: "Desenvolvimento de Sistemas",
  modulo: "3º módulo",
};

// Simula o tempo de resposta de uma API real.
function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(email, senha) {
  await aguardar(1500);

  const emailNormalizado = String(email ?? "").trim().toLowerCase();

  if (emailNormalizado === EMAIL_VALIDO && senha === SENHA_VALIDA) {
    // Token fictício apenas para simular uma sessão autenticada.
    return {
      user: { ...USUARIO },
      token: "token-meu-curso-2026",
    };
  }

  throw new Error("E-mail ou senha incorretos.");
}
