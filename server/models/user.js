'use strict';
module.exports = (sequelize, DataTypes) => {
var user = sequelize.define('user', {
	id_user: {
		type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
	},
	Name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Password: {
        type: DataTypes.STRING,
        allowNull : false
    },
    Level: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	defaultValue: 2
    }
}, {
	timestamps: false,
	tableName: 'User'
});

user.associate = function(models) {
	user.hasMany(models.records, {
		foreignKey: 'id_record',
		sourceKey: 'id'
	});
};
return user;
};