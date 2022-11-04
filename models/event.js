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
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "We need a gift exchange date",
                },
            },
        },
        budget: {
            type: DataTypes.INTEGER,
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
        drawn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: [true],
                msg: "We need a boolean value"
            }
        }
    };

    const eventModel = connection.define("Event", schema);
    return eventModel;

};