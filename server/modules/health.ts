import { Module } from './index';

const registerHealth: Module = server => () => {
  server.get('/health', (req, res) => res.send('UP'));
};

export default registerHealth;
