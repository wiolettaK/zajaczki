let usersData;
let companiesData;
let usersInCompanies = {};
let sortedCompanies = {};
let companiesAndUsers = [];

function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.send(null);
};

httpGetAsync("http://localhost:3000/users", function(text){
    usersData = JSON.parse(text);
    usersData.forEach(user => {
        if (usersInCompanies[user.uris.company]){
            usersInCompanies[user.uris.company]++;
        } else {
            usersInCompanies[user.uris.company] = 1;
        }
    });
});
httpGetAsync("http://localhost:3000/companies", function(text){
    companiesData = JSON.parse(text);
    companiesData.forEach(company => {
        company.numberOfUsers = usersInCompanies[company.uri] || 0;
        matchComapnyAndUsers(company);
    });
    sortedCompanies = companiesData.sort( (a,b) =>  a.numberOfUsers - b.numberOfUsers );
    sortedCompanies.forEach(company => createRow(company));
    console.log(sortedCompanies);
    console.log(companiesAndUsers);
});
function matchComapnyAndUsers(company) {
    companiesAndUsers.push({companyName:company.name, companyUsers:usersData
        .filter(user => user.uris.company === company.uri)
        .map(user => ({userName: user.name, userEmail: user.email}))});
};

function createRow(company) {
    const rowHTML = "<th>"+company.name+"</th><th>"+company.numberOfUsers+"</th>";
    const newElement = document.createElement('tr');
    newElement.innerHTML = rowHTML;
    document.getElementsByClassName("companies-table")[0].appendChild(newElement);
  };