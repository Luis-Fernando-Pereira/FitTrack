const mock = [
  {
    "codigo": 1,
    "nome": "Ana Souza",
    "email": "ana.souza@email.com",
    "senha": "senha123",
    "foto": "ana.jpg"
  },
  {
    "codigo": 2,
    "nome": "Carlos Lima",
    "email": "carlos.lima@email.com",
    "senha": "abc12345",
    "foto": "carlos.jpg"
  }
];

jest.mock('../database/dao/AdministradorDao.js', () => {
  return {
    AdministradorDao: jest.fn().mockImplementation(() => ({
      buscarTodos: jest.fn().mockReturnValue(mock),
      novoAdministrador: jest.fn().mockImplementation((adminModel) => {
        adminModel.coidgo = Math.random();        
        return adminModel;
      })
    }))
  }
})

const { AdministradorService } = require('../service/AdministradorService');
const { AdministradorModel } = require('../model/AdministradorModel');

test('Função buscarTodosAdministradores deve retornar lista de AdministradorModel', async () => {
  const admin = new AdministradorService();
  const resultado = await admin.listarTodos();

  expect(resultado).toHaveLength(2);
  expect(resultado[0]).toBeInstanceOf(AdministradorModel);
  
});

test('Deve retornar AdministradorModel com código numérico', async () => {
  const admin = new AdministradorService();
  const resultado = await admin.criar({
    nome:   "Luis",
    email:  "Luis@gmail.com",
    foto:   "/home/fernando/projetos/projetos_faculdade/node_projects/FitTrack/controller/AdministradorController.js",
    senha:  "123"
  });

  expect(resultado).toBeInstanceOf(AdministradorModel);
  expect(resultado).toHaveProperty(codigo);
  expect(resultado.codigo).toContain(Number);
});


