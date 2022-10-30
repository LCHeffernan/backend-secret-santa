module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "We need a title",
                },
            },
        },
        exchange_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "We need a gift exchange date",
                },
            },
        },
        budget: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "We need a budget",
                },
            },
        },
        participants: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // user_id: {
        //     type: DataTypes.INT(FK),
        //     allowNull: false,
        // },
    };

    const eventModel = connection.define("Event", schema);
    return eventModel;

};