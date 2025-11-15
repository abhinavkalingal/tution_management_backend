// routes/branches.js
const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { authenticate, authorize } = require('../middleware/authMiddleware');


router.post('/', authenticate, authorize(['admin','superadmin','branchadmin']), branchController.createBranch);
router.get('/', authenticate, authorize(['admin','superadmin','branchadmin']), branchController.getBranches);
router.get('/:id', authenticate, branchController.getBranchById);
router.put('/:id', authenticate, authorize(['admin','superadmin','branchadmin']), branchController.updateBranch);
router.delete('/:id', authenticate, authorize(['admin','superadmin']), branchController.deleteBranch);

module.exports = router;
