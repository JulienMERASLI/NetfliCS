import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

router.get('/', function (req, res) {
  exec(`call run_python.bat ${req.user.id}`, (error, stdout) => {
    if (error) {
      console.error(`Error: ${error.message}`);

      return res.status(500).json({ error: 'An error occurred' });
    }
    console.log(`${stdout}`);
    res.json({ recommended: JSON.parse(stdout.split('\r\n').at(-2)) });
  });
});

export default router;
