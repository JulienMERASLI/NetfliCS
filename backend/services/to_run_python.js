import { exec } from 'child_process';

// Appel de scripts Python

exec('python backend/recommendation.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);

    return;
  }
  console.log(`${stdout}`);
});
