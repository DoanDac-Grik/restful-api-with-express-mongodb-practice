export function APIfeatures(query, queryString){
    this.query = query;
    this.queryString = queryString;

    this.paginating = ()=>{
        const limit =  queryString.limit * 1 || 5;
        const page = queryString.page *1 || 1;
        const skip = limit * (page -1);
        
        this.query = this.query.limit(limit).skip(skip);

        return this;
    }

    this.sorting = ()=>{
        const sort = queryString.sort || 'createdAt';
        this.query = this.query.sort(sort);
        return this;
    }

    this.searching = () => {
        const search =  this.queryString.search;
        if(search){
            this.query = this.query.find({
                title: search
            });
        }
        else {
            this.query = this.query.find();
        }
        return this;
    }

    this.filtering = ()=>{
        const queryObj = {...this.queryString};
        const exculdeFields = ['page', 'sort', 'limit', 'search'];
        exculdeFields.forEach(el => delete(queryObj[el]));
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}