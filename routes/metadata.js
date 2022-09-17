
function Metadata() {
    this.API_KEY = [];

    this.chain = [];
    this.name = [];
    this.symbol = [];
    this.ownerAddress = [];
};

Metadata.prototype.addNewApiKey = function(ApiKey) {
    this.API_KEY.push(ApiKey);
    return this.API_KEY[-1];
};

module.exports =  Metadata;