import app from './app';
import { Shared } from './domain/Shared'

const server = app;

server.listen(Shared.PORT, () => {
  console.log(`Server listening on port ${Shared.PORT}`);
});