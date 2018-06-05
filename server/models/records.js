'use strict';
module.exports = (sequelize, DataTypes) => {
var records = sequelize.define('records', {
	id_records: {
		type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
	},
	Level: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	Points: {
        type: DataTypes.STRING,
        allowNull : false
    },
    id_user: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    }
}, {
	timestamps: false,
	tableName: 'Records'
});

records.associate = function(models) {
	records.belongsTo(models.user, {
		foreignKey: 'id_record'
	});
};
return records;
};