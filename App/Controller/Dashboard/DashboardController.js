
const dashboard = async (req, res) => {
    try {
        res.render('dashboard', { title: 'Dashboard' ,
            user: req.user,
         });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).render('error', { message: 'Unable to load the dashboard. Please try again later.' });
    }
};
export default {
    dashboard
}