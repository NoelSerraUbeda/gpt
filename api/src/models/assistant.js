module.exports = function (sequelize, DataTypes) {
  const Assistant = sequelize.define('Assistant', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Por favor, rellena todos los campos.'
        }
      }
    },
    assistant: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Por favor, rellena todos los campos.'
        }
      }
    },
    default: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena todos los campos.'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'assistants',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'assistants_email_index',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email' }
        ]
      },
    ]
  })

  Assistant.associate = function (models) {

  }

  return Assistant
}