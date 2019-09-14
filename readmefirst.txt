
-------------------------------------------------------------------------------------------------------
for searching by keyword create index based on below query
db.users.createIndex({"specification":"text","description":"text"},{weight:{
"specification":10,"description":5}},
"name":"search index"
)
-------------------------------------------------------------------------------------------------------



contact number required --- compulsory