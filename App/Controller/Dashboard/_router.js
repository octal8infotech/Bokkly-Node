import express from 'express';
import DashboardController from './DashboardController.js';
import passport from 'passport';
const router = express.Router();
router.get('/',DashboardController.dashboard);
export default router;