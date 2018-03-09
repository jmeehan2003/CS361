{{> header }}

<div class="container" margin="25px">
	<h1> {{title}} </h1>
	<h1><font color="brown"> Bloom, Terra Sign Up </h1>
	<font color="black">
	{{#if errors}}
		{{#each errors}}
			<div class="alert alert-danger">
				{{this.msg}}
			</div>
		{{/each}}
	{{/if}}
	<form id="signup" method="POST" action="/signup">
	  <div class="form-row">
    	    <div class="form-group col-md-6">
      		<label for="inputFName">First Name*</label>
      		<input type="text" class="form-control" id="inputFName" name="fname" placeholder="First Name">
    	    </div>
    	    <div class="form-group col-md-6">
      		<label for="inputLName">Last Name*</label>
      		<input type="text" class="form-control" id="inputLName" name="lname" placeholder="Last Name">
    	    </div>
  	  </div>
	  <div class="form-row"> 
    	    <div class="form-group col-md-6">
      		<label for="inputEmail">Email* (you will use this to login)</label>
      		<input type="email" class="form-control" id="inputEmail" name="useremail" placeholder="Email">
    	    </div>
	    <div class="form-group col-md-6">
		<label for="inputPhone">Phone</label>
		<input type="text" class="form-control" id="inputPhone" name="phone" placeholder="Phone">
	    </div>
	  </div>
	  
  	  <div class="form-group">
    	    <label for="inputAddress">Address*</label>
    	    <input type="text" class="form-control" id="inputAddress" name="street" placeholder="1234 Main St">
  	  </div>
  	  <div class="form-group">
    	    <label for="inputAddress2">Address 2</label>
    	    <input type="text" class="form-control" id="inputAddress2" name="street2" placeholder="Apartment, studio, or floor">
  	  </div>
  	  <div class="form-row">
    	    <div class="form-group col-md-6">
      		<label for="inputCity">City*</label>
     		 <input type="text" class="form-control" id="inputCity" name="city" placeholder="City">
    	    </div>
    	    <div class="form-group col-md-4">
      		<label for="inputState">State</label>
      		<select id="inputState" class="form-control" name="state">
        		<option value="" selected="selected" disabled="disabled">Choose...</option>
        		<option>...</option>
			<option value="AL">Alabama</option>
			<option value="AK">Alaska</option>
			<option value="AZ">Arizona</option>
			<option value="AR">Arkansas</option>
			<option value="CA">California</option>
			<option value="CO">Colorado</option>
			<option value="CT">Connecticut</option>
			<option value="DE">Delaware</option>
			<option value="DC">District Of Columbia</option>
			<option value="FL">Florida</option>
			<option value="GA">Georgia</option>
			<option value="HI">Hawaii</option>
			<option value="ID">Idaho</option>
			<option value="IL">Illinois</option>
			<option value="IN">Indiana</option>
			<option value="IA">Iowa</option>
			<option value="KS">Kansas</option>
			<option value="KY">Kentucky</option>
			<option value="LA">Louisiana</option>
			<option value="ME">Maine</option>
			<option value="MD">Maryland</option>
			<option value="MA">Massachusetts</option>
			<option value="MI">Michigan</option>
			<option value="MN">Minnesota</option>
			<option value="MS">Mississippi</option>
			<option value="MO">Missouri</option>
			<option value="MT">Montana</option>
			<option value="NE">Nebraska</option>
			<option value="NV">Nevada</option>
			<option value="NH">New Hampshire</option>
			<option value="NJ">New Jersey</option>
			<option value="NM">New Mexico</option>
			<option value="NY">New York</option>
			<option value="NC">North Carolina</option>
			<option value="ND">North Dakota</option>
			<option value="OH">Ohio</option>
			<option value="OK">Oklahoma</option>
			<option value="OR">Oregon</option>
			<option value="PA">Pennsylvania</option>
			<option value="RI">Rhode Island</option>
			<option value="SC">South Carolina</option>
			<option value="SD">South Dakota</option>
			<option value="TN">Tennessee</option>
			<option value="TX">Texas</option>
			<option value="UT">Utah</option>
			<option value="VT">Vermont</option>
			<option value="VA">Virginia</option>
			<option value="WA">Washington</option>
			<option value="WV">West Virginia</option>
			<option value="WI">Wisconsin</option>
			<option value="WY">Wyoming</option>
      		</select>
    	    </div>
    	    <div class="form-group col-md-2">
      		<label for="inputZip">Zip Code</label>
      		<input type="text" class="form-control" id="inputZip" name="zip" placeholder="Zip Code">
    	    </div>
  	  </div>	
  	  <div class="form-group">
    	    <label for="inputCountry">Country*</label>
    	    <input type="text" class="form-control" id="inputCountry" name="country" placeholder="Country">
  	  </div>
  	  <div class="form-row">
    	    <div class="form-group col-md-6">
      		<label for="inputSkills">Skills</label>
     		 <input type="text" class="form-control" id="inputSkills" name="skills" placeholder="Enter Relevant Skills Here (i.e. Biologist, Botanist, etc)">
    	    </div>
	    <div class="form-group col-md-6">
		<label for="inputBioFav">Favorite Biodiversity</label>
		<select class="form-control" id="inputBioFav" name="bio">
			<option value="select" selected="selected" disabled="disabled"> Choose...</option>
			{{#each biotypes}}
			<option value="{{id}}">{{type}}</option>
			{{/each}}
		</select>
	    </div>
	  </div>
       <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password*</label>
            <input type="password" class="form-control" id="inputPassword4" name="password" placeholder="Password">
          </div>
          <div class="form-group col-md-6">
            <label for="verifyPassword">Verify Password*</label>
            <input type="password" class="form-control" id="verifyPassword" name="verpassword" placeholder="Password">
          </div>
      </div>
      <div class="form-row">
     	  <div>
	    <p>Passwords must contain at least one lowercase character, one uppercase character, one number, and one special symbol </p>
          </div>
     </div>
     <div>
	<p>* denotes required field</p>
  	<button type="submit" class="btn btn-primary">Sign Up</button>
    </div>
    </form>
</div>

