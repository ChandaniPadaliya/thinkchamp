/* eslint-disable */
function service({ model }) {
  const createDocument = async (data) => {
    try {
      const result = await model.create(data);
      return result;
    } catch (err) {
      throw err;
    }
  };
  

  const createManyDocument = async (data) => {
    try {
      const result = await model.insertMany(data);
      return result;
    } catch (err) {
      throw err;
    }
  };

    const getDocumentById = async (id, select = []) => {
      try {
        const data = await model.findOne({ _id: id }, select).exec();
        return data;
      } catch (err) {
        throw err;
      }
    };

    const updateDocument = async (id, data) => {
      const newData = { ...data };
      delete newData.id;
    
      try {
        const result = await model.updateOne({ _id: id }, newData, { new: true });
        return result;
      } catch (err) {
        throw err;
      }
    };

  const deleteDocument = async (id) => {
    try {
      const data = await model.findByIdAndRemove(id).exec();
      return data;
    } catch (err) {
      throw err;
    }
  };

    const getDocumentByQuery = async (where, select = []) => {
      try {
        const data = await model.find(where, select).exec();
        return data;
      } catch (err) {
        // Handle or log error if needed
        throw err;
      }
    };

    const getCountDocumentByQuery = async (where) => {
      try {
        const count = await model.countDocuments(where).exec();
        return count;
      } catch (err) {
        throw err;
      }
    };
    const getDocumentByQueryPopulate = async (where, select = [], population = [], pageNumber, pageSize, sort = {}) => {
      try {
        const query = model.find(where).populate(population).select(select).sort(sort);
    
        if (pageNumber && pageSize) {
          query.skip((parseInt(pageNumber) - 1) * parseInt(pageSize)).limit(parseInt(pageSize));
        }
    
        const data = await query.exec();
        return data;
      } catch (err) {
        throw err;
      }
    };
    




    
    const getSingleDocumentByQueryPopulate = async (where, select = [], population = []) => {
      try {
        const data = await model.findOne(where).populate(population).select(select).exec();
        return data;
      } catch (err) {
        throw err;
      }
    };

    const getSingleDocumentByIdPopulate = async (id, select = [], population = []) => {
      try {
        const data = await model.findOne({ _id: id }).populate(population).select(select).exec();
        return data;
      } catch (err) {
        throw err;
      }
    };
    const getSingleDocumentById = async (id, select = []) => {
      try {
        const data = await model.findOne({ _id: id }, select).exec();
        return data;
      } catch (err) {
        throw err;
      }
    };

    const getSingleDocumentByQuery = async (where, select = []) => {
      try {
        const data = await model.findOne(where, select).exec();
        return data;
      } catch (err) {
        throw err;
      }
    };
    

  const findExistsData = async (data) => {
    const { query } = data;
    const { and, or } = query;
    const q = {};
  
    if (and) {
      q.$and = and;
    }
  
    if (or) {
      q.$or = or;
    }
  
    try {
      const result = await model.find(q).exec();
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  const softDeleteDocument = async (id) => {
    try {
      const result = await getSingleDocumentById(id);
      
      if (!result) {
        return "No Data Found";  // Return early if no document is found
      }
  
      // Update document fields
      result.isDeleted = true;
      result.isActive = false;
  
      // Update the document in the database
      const updateResult = await model.updateOne({ _id: id }, result).exec();
      return updateResult;
    } catch (err) {
      throw err;  // Handle errors appropriately
    }
  };
  
    const hardDeleteDocument = async (id) => {
      try {
        const result = await model.deleteOne({ _id: id }).exec();
    
        if (result.deletedCount === 0) {
          return "No Data Found";  // Return message if no document was deleted
        }
    
        return "Document deleted successfully";  // Return success message
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    

    const softDeleteByQuery = async (query) => {
      try {
        const result = await getSingleDocumentByQuery(query);
        
        if (!result || result.length === 0) {
          return "No Data Found";  // Return if no documents are found
        }
    
        // Update document fields
        result.forEach(doc => {
          doc.isDeleted = true;
          doc.isActive = false;
          delete doc.id;  // Remove the id property
        });
    
        // Update the documents in the database
        const updateResult = await model.updateMany(query, { $set: { isDeleted: true, isActive: false } }).exec();
        return updateResult;
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    

    const bulkInsert = async (data) => {
      try {
        const result = await model.insertMany(data);
        return result;  // Return the result of the bulk insert
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    

    const bulkUpdate = async (filter, data) => {
      try {
        const result = await model.updateMany(filter, data);
        
        if (result.modifiedCount === 0) {
          throw new Error("No documents were updated.");  // Handle case where no documents were modified
        }
    
        return result;  // Return the result of the update
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    

    const countDocument = async (where) => {
      try {
        const result = await model.countDocuments(where);
        return result;  // Return the count result
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    
    const findOneAndUpdateDocument = async (filter, data, options = {}) => {
      try {
        const result = await model.findOneAndUpdate(filter, data, options);
        return result;  // Return the updated document
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };

    const findOneAndDeleteDocument = async (filter, options = {}) => {
      try {
        const data = await model.findOneAndDelete(filter, options);
        return data;  // Return the deleted document
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    
    

    const getDocumentByAggregation = async (query) => {
      let array = [];
    
      for (const [keys, values] of Object.entries(query)) {
        let aggregate = {};
        let input = {};
        let finalInput = {};
    
        for (const [key, value] of Object.entries(values)) {
          switch (keys) {
            case "group": {
              const valuesOfAggregate = Object.values(value);
              const valuesOfFields = Object.values(valuesOfAggregate[0]);
              const keysOfFields = Object.keys(valuesOfAggregate[0]);
    
              for (const [nestKey, nestValue] of Object.entries(valuesOfFields)) {
                input._id = `$${keysOfFields[nestKey]}`;
                finalInput[`$${key}`] = Array.isArray(nestValue) 
                  ? nestValue.map(j => `$${j}`).join(', ')
                  : `$${nestValue}`;
                input[nestValue] = finalInput;
    
                aggregate.$group = input;
                array.push(aggregate);
                aggregate = {};
                input = {};
                finalInput = {};
              }
              break;
            }
    
            case "match": {
              const valuesOfFields = Object.values(value).flat();
              const keysOfFields = Object.keys(value);
              
              if (Array.isArray(valuesOfFields) && valuesOfFields.length > 1) {
                finalInput.$in = valuesOfFields;
                input[keysOfFields[0]] = finalInput;
              } else {
                input[keysOfFields[0]] = valuesOfFields[0];
              }
    
              aggregate.$match = input;
              array.push(aggregate);
              break;
            }
    
            case "project": {
              const valuesOfFields = Object.values(value);
              if (valuesOfFields.length === 1) {
                const projectValues = Object.values(valuesOfFields[0]).toString();
                const projectKeys = Object.keys(valuesOfFields[0]).toString();
                const projectArr = [];
    
                if (isNaN(projectValues)) {
                  projectArr.push(`$${projectKeys}`);
                  projectArr.push(`$${projectValues}`);
                } else {
                  projectArr.push(`$${projectKeys}`);
                  projectArr.push(projectValues);
                }
                finalInput[`$${key}`] = projectArr;
                input[projectKeys] = finalInput;
                aggregate.$project = input;
                array.push(aggregate);
              }
              break;
            }
          }
        }
      }
    
      try {
        const data = await model.aggregate(array);
        return data;  // Return the aggregation result
      } catch (err) {
        throw err;  // Handle errors appropriately
      }
    };
    

  return Object.freeze({
    createDocument,
    updateDocument,
    getDocumentByQuery,
    getCountDocumentByQuery,
    getDocumentByQueryPopulate,
    getSingleDocumentByQueryPopulate,
    getSingleDocumentByIdPopulate,
    getDocumentById,
    deleteDocument,
    getSingleDocumentById,
    findExistsData,
    softDeleteDocument,
    softDeleteByQuery,
    bulkInsert,
    bulkUpdate,
    countDocument,
    getSingleDocumentByQuery,
    findOneAndUpdateDocument,
    findOneAndDeleteDocument,
    getDocumentByAggregation,
    hardDeleteDocument,
    createManyDocument
  });
}
module.exports = service;
