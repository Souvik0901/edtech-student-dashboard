BACKEND

Sure, I'll break down the code line by line:

let recentlyViewedCourse = await RecentlyViewed.findOneAndUpdate(
This line initiates an update operation on the RecentlyViewed collection using the findOneAndUpdate method.

  { userId, courseId: id },
This part specifies the query criteria for finding the document to update. It looks for a document with userId matching the userId variable and courseId matching the id variable.

  { 
    $set: { 
      updatedAt: new Date(),
      createdAt: { $cond: [{ $eq: ["$createdAt", null] }, new Date(), "$createdAt"] }
    } 
  },
This section defines the update operation.
$set is an update operator that sets the specified fields to the provided values.
updatedAt field is set to the current date using new Date().
createdAt field is conditionally set:
$cond is a conditional operator that evaluates conditions and returns one of two specified expressions.
{ $eq: ["$createdAt", null] } checks if the createdAt field is null.
If createdAt is null (indicating that the document is being created for the first time), new Date() is used to set it to the current date.
If createdAt is not null (indicating that the document already exists), its existing value is retained by using "$createdAt".

  { upsert: true, new: true }
);
This part specifies options for the update operation:
upsert: true indicates that if no document matches the query criteria, a new document should be created with the specified fields.
new: true ensures that the method returns the modified document rather than the original one.
This entire operation updates the recentlyViewedCourse document in the RecentlyViewed collection, setting updatedAt to the current date and conditionally setting createdAt based on whether the document already exists or is being created for the first time.



FRONTEND
1. No More Changes
