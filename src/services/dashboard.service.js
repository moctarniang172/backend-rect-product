const user = require('../models/user')
const hotel = require('../models/hotels');
const { promises } = require('nodemailer/lib/xoauth2');



exports.stat_dashboard = async (userId) => {

    const [totaluser,totalhotel,totalemails,totalmessage,userThisMonth,hotelThisMonth] = await Promise.all([

        user.countDocuments(),

        hotel.countDocuments({author: userId}),

        user.countDocuments({
            email: { $exists: true, $ne: null }
        }),

        user.countDocuments({
            message: { $exists: true, $ne: null }
        }),

        user.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        }),

        hotel.countDocuments({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
        })
    ]);

    return {
        totaluser,
        totalhotel,
        totalemails,
        totalmessage,
        userThisMonth,
        hotelThisMonth
    };
};
