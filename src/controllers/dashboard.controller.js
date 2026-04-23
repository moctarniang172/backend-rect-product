const dasboardService = require('../services/dashboard.service');

exports.dashboard = async (req, res) => {
    try {
        const stats = await dasboardService.stat_dashboard(req.user.id);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};