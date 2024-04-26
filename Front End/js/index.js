function signIn(e) {
    let usr = document.getElementById("usr").value;
    let pwd = document.getElementById("pwd").value;

    if(usr === 'root12345' && pwd === 'root$12345'){
      window.location = "dashboard-root-staff-account-creation.html";
    }

    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': usr,
        'password': pwd
      })
    })
    .then(response => response.text())
    .then(data => {
      switch (data) {
        case 'User is not active.':
          document.getElementById("infodisplay").innerHTML = 'User is not active.';
          break;
        case 'Login failed.':
          document.getElementById("infodisplay").innerHTML = 'Login failed.';
          break;
        case 'STAFF*':
          localStorage.setItem('username', usr);
          window.location = "dashboard-staff-change-password.html";
          break;  
        case 'STAFF':
          localStorage.setItem('username', usr);
          window.location = "dashboard.html";
          break;
        case 'PROFESSIONAL':
          localStorage.setItem('username', usr);
          window.location = "dashboard-professional-profile-management.html";
          break;
        case 'PROFESSIONAL*':
          localStorage.setItem('username', usr);
          window.location = "dashboard-professional-change-password.html";
          break;  
        case 'EMPLOYER':
          localStorage.setItem('username', usr);
          window.location = "dashboard-company-account-management.html";
          break;
        case 'EMPLOYER*':
          localStorage.setItem('username', usr);
          window.location = "dashboard-company-change-password.html";
          break;

        default:
          document.getElementById("infodisplay").innerHTML = 'Not A Valid Account';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

  function userValidate() {
    let pattern = /^[a-zA-Z][a-zA-Z0-9]{7,}$/;
    if(pattern.test(document.getElementById("usr").value)){
      document.getElementById("uinfodisplay").innerHTML = '';
    }else{
      document.getElementById("uinfodisplay").innerHTML = 'Not A Valid Username';
    }
  }

  function passwordValidate() {
    let pattern = /^(?=.*?[a-zA-Z])(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(pattern.test(document.getElementById("pwd").value)){
      document.getElementById("pinfodisplay").innerHTML = '';
    }else{
      document.getElementById("pinfodisplay").innerHTML = 'Not A Valid Password';
    }
  }

  function signUp(e) {
    window.location = "sign-up.html";
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
      signIn();
    }
  });