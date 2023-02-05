class APIFeatures{
    constructor(query,queryString){
      this.query = query;
      this.queryString = queryString;
    }

    filter(){
      const queryObj = {...this.queryString};
      const excludeObj = ['page','sort','limit','fields'];
      excludeObj.forEach((el)=> delete queryObj[el]);
      this.query = this.query.find(queryObj);
      return this;
    }

    sort(){
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }else{
        this.query = this.query.sort('-duration');
      }
      return this;
    }

    limitFields(){
      if(this.queryString.fields){
        const field = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(field);
      }else{
        this.query.select('-__v');
      }
      return this;
    }
    
    paginate(){
      const page = +this.queryString.page || 1;
      const limit = +this.queryString.limit || 20;
      const skip = (page-1) * limit;
  
      this.query.skip(skip).limit(limit);
      return this;
    }
}

module.exports = APIFeatures;