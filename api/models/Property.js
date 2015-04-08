module.exports = {

	attributes: {

	    // Tipo do imóvel
	    // e.g. 1-casa, 2-apartamento, etc
	    type: {
	      type: 'int',
	      required: true
	    },

	    // Av. ou rua do endereço
	    // e.g. rua duqye de caxias
	    addressStreet: {
	      type: 'string',
	      required: true
	    },

	    // Proprietario
	    // e.g. nikola
	    owner: {
	      type: 'string',
	      required: true
	    },

	    // Código
	    // e.g. 00123
	    id: {
	      type: 'int',
	      required: true,
	      unique: true
	    },

  }
};

