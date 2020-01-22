const buttonSearch = $("#buttonSearch");
const loader = $('.loader');


let jobsGithub = [];
let jobsWeWork = [];
let jobsRemoteOk = [];
let jobsAJ = [];
let jobsCodepen = [];
let jobsLanding = [];

$(".menu").click(() => {
    if ($("#menu-items").css("display", "block")) {
        $("#menu-items").css("display", "none");
    } else {
        $("#menu-items").css("display", "block");
    }
})

// Display all the jobs when the window is loaded

$(window).ready(() => {
    displayAllJobs();
})

function displayAllJobs() {

    displayGithubJobs();

    displayWeWorkJobs();

    displayRemoteOkJobs();

    displayCodepenJobs();

    displayAjJobs();

}

function displayGithubJobs() {
    fetch("https://github-jobs-proxy.appspot.com/positions?description=&location=")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsGithub.push(...data);
            displayJobs();
            jobsGithub = [];
            jobsRemoteOk = [];
        }).catch(err => {
            console.log(err);
        })
}


function displayJobs() {
    if (!jobsGithub.length == 0) {
        const htmlGithub = jobsGithub.reduce((acc, {
            title,
            location,
            url,
            type,
            company,
            company_url,
            company_logo,

        }) =>

            acc += ` 

             <div class="job-header">
                <img class="company-logo" src="${company_logo ? company_logo : "../images/question-sign.svg"}" ></img>
                        <div class="job-header-2">
                                <a href="${url}" target="_blank" class="job-title">${title}</a>
                                <a href="${company_url}" target="_blank" class="job-company">${company}</a>
                            </div>
                        </div>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-map-marker-alt"></i>${location}</p>
                            <p class="job-type"><i class="fas fa-suitcase-rolling"></i>${type}</p>
                        </div>
                        <hr>`, ``);

        $('#resultGithub').html(htmlGithub);
        jobsGithub = [];
        jobsRemoteOk = [];
        $('.loader').hide();
        $('.job-filter').show();

    }


    if (!jobsRemoteOk.length == 0) {

        // Remove the first element from array
        jobsRemoteOk.shift();

        const htmlRemoteOk = jobsRemoteOk.reduce((acc, {
            url,
            company,
            created_at,
            company_logo,
            description,
            position,
            tags
        }) =>
            acc += ` 

             <div class="job-header">
                <img src="${company_logo ? company_logo : "../images/question-sign.svg"}" class="company-logo"></img>
                            <div class="job-header-2">
                                <a href="${url}" target="_blank" class="job-title">${position}</a>
                                <a target="_blank" class="job-company">${company ? company : "No Company Info"}</a>
                            </div>
                        </div>
                        <p class="job-desc"></p>
                        <div class="job-tags">
                            <p class="job-location"><i class="fas fa-tags"></i>${tags.map(tag => {
                return tag.toUpperCase();
            }).join(', ')}</p>
                            
                        </div>
                        <hr>`, ``);

        $('#resultRemoteOk').html(htmlRemoteOk);
        jobsRemoteOk = [];
        jobsGithub = [];
        $('.loader').hide();
        $('.job-filter').show();
    }
}


function displayRemoteOkJobs() {
    fetch("https://remoteok.io/api")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsRemoteOk.push(...data);
            displayJobs();
            jobsGithub = [];
            jobsRemoteOk = [];
        }).catch(err => {
            console.log(err);
        })
}

$(buttonSearch).click(() => {
    if (inputDetail.value != '' || inputLocation.value != '') {
        fetch(`https://github-jobs-proxy.appspot.com/positions?description=${inputDetail.value ? inputDetail.value : ''}&location=${inputLocation.value ? inputLocation.value : ''}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                jobsGithub.push(...data);
                console.table(jobsGithub);
                displayJobs();
            })
        inputDetail.value = '';
        inputLocation.value = '';
        jobsGithub = [];
        jobsRemoteOk = [];
    } else {
        alert("Please enter some information!");
    }
})

inputDetail.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        if (inputDetail.value != '' || inputLocation.value != '') {
            fetch(`https://github-jobs-proxy.appspot.com/positions?description=${inputDetail.value ? inputDetail.value : ''}&location=${inputLocation.value ? inputLocation.value : ''}`)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    jobsGithub.push(...data);
                    console.table(jobsGithub);
                    displayJobs();
                })
            inputDetail.value = '';
            inputLocation.value = '';
            jobsGithub = [];
            jobsRemoteOk = [];
        } else {
            alert("Please enter some information");
        }
    }
});

$("#inputLocation").keyup(function (e) {
    if (e.keyCode == 13) {
        if (inputDetail.value != '' || inputLocation.value != '') {
            fetch(`https://github-jobs-proxy.appspot.com/positions?description=${inputDetail.value ? inputDetail.value : ''}&location=${inputLocation.value ? inputLocation.value : ''}`)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    jobsGithub.push(...data);
                    console.table(jobsGithub);
                    displayJobs();
                })
            inputDetail.value = '';
            inputLocation.value = '';
            jobsGithub = [];
            jobsRemoteOk = [];
        } else {
            alert("Enter some information");
        }
    }
});

function displayWeWorkJobs() {
    fetch("https://www.weworkmeteor.com/api/jobs")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsWeWork.push(data);
            console.log(jobsWeWork);

            if (!jobsWeWork.length == 0) {
                let htmlWeWork = ``;
                jobsWeWork.forEach(element => {
                    // console.log(element.data);
                    element.data.forEach(info => {

                        htmlWeWork += ` 
               <div class="job-header">
                  <img src="${info.company_logo ? info.company_logo : '../images/question-sign.svg'}" class="company-logo"></img>
                              <div class="job-header-2">
                                  <a href="${info.siteUrl ? info.siteUrl : "No Info"}" target="_blank" class="job-title">${info.title}</a>
                                  <a target="_blank" class="job-company">${info.company ? info.company : "No Info"}</a>
                              </div>
                          </div>
                          <p class="job-desc"></p>
                          <div class="job-tags">
                              <p class="job-location"><i class="fas fa-map-marker-alt"></i>${info.location ? info.location : "No Info"}</p>
                          </div>
                          <hr>`;
                    });
                });
                $('#resultWeWork').empty().html(htmlWeWork);
                jobsWeWork = [];
            }
        }).catch(err => {
            console.log(err);
        });
}

function displayCodepenJobs() {
    fetch("https://codepen.io/jobs.json")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsCodepen.push(data);
            let html = ``;
            if (!jobsCodepen.length == 0) {

                jobsCodepen.forEach(element => {
                    for (var i in element) {
                        data[i].forEach(element => {
                            html += ` 
                    <div class="job-header">
                        <img src="${element.company_logo ? element.company_logo : '../images/question-sign.svg'}" class="company-logo"></img>
                                    <div class="job-header-2">
                                        <a href="${element.url}" target="_blank" class="job-title">${element.title}</a>
                                        <a target="_blank" class="job-company">${element.company_name ? element.company_name : "No Company Info"}</a>
                                    </div>
                                </div>
                                <p class="job-desc"></p>
                                <div class="job-tags">
                                    <p class="job-location"><i class="fas fa-map-marker-alt"></i>${element.location}</p>
                    </div>
                                <hr>`;
                        });
                    }
                });
                $('#resultCodepen').empty().html(html);
            }

        }).catch(err => {
            console.log(err);
        })
}

function displayAjJobs() {
    fetch("https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=986ed32d86ee52b3526699807b65fd75&method=aj.jobs.search&format=json&perpage=100")
        .then((response) => {
            return response.json();
        }).then((data) => {
            jobsAJ.push(data);
            let html = ``;

            if (!jobsAJ.length == 0) {
                jobsAJ.forEach(element => {
                    for (i in element) {
                        // TODO
                    }
                });
                $("#resultAJ").empty().html(html);
            }

        }).catch(err => {
            console.log(err);
        })
}
