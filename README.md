## Hello there!

Welcome to the Mark43 front end software engineer take home test. First and foremost, the goal of this test is not to take inordinate amounts of your time (don't spend more than 2 hours on this), but instead to give you a fun task to work on for a couple of hours so we can get to know you as a coder without the pressure of having to type with someone watching over your shoulder. So consider this a freestyle - a way to express the way you think. We'll be reading your code, so write stuff you'll be proud of, comment where you feel appropriate, and above all, have fun!


## The Challenge

### Build an autocomplete...

Okay yeah that's pretty vague. Let's be more specific:

Example of a fancy autocomplete front end library: https://twitter.github.io/typeahead.js/. Don't go and build this. It's way too much functionality. Negative points for building this. Example of something closer to what we expect: http://jqueryui.com/autocomplete/ (default functionality)

### Specifically we'd like the following:

* First, you'll need a text input element.
* You'll use a mock server (see `namesMockResource.js`) to get a list of names. You'll probably want to filter the values before the client uses them.
* The autocomplete should match on first name, last name, any substring and whatever else you want.
* Matching part of the text should be bolded. For example, if the input was "ess", then the option should display J**ess**ica.
* When the user types in the text input, filter for matching terms against the backing array, and display ones that match as dropdown options.
* The user should be able to click on a value, and that value should persist in the input field.
* The user should be able to use the keyboard to navigate between and select values.
* No need to make this any specific type of component, instead it can be a Backbone view, or a React component, or a jQuery widget, etc. Keep it modular, but don't go out of your way to add infinite settings, we're not going to open source your code tomorrow. And use what you're comfortable with. We won't judge, unless it involves PHP.
* Make sure an example of the autocomplete is clearly visible when we hit the server.

We've intentionally left some of the details up to you. The goal is to make something that works well, even with a lot of values. Shoot for performance, simplicity, and a natural feel for the user. The only thing we've provided is a mock resource file which has one function, `getNames`. Use it to provide values for you and test different array sizes. Treat this as if it were a mock server.

Okay, so let's get set up!


## Getting Setup

### Installation

This test uses ES2015 modules and webpack (http://webpack.github.io/) to package the code for the browser and is designed to allow you to use whichever frameworks/libraries you choose.

Do the following, from within the same directory as this README:

* We assume you have Node installed, if not, get yo self out from under that rock and install that guy at https://nodejs.org/
* `npm install` - installs dependencies specified in `package.json` for this particular project

### Running the server

`npm run devserver` - should now be able to hit localhost:4343

### Adding dependencies

It's really simple with npm and webpack to add dependencies. Check out npmjs.com if you're unfamiliar with npm. Most things you'd ever want will be there. As a backup, you can always throw a script tag at the top. To see what's already included, see `package.json`. Feel free to add whatever, such as Backbone, React, Knockout, Angular, etc. Babel 6 is included for you so you can use ES2015 (also known as ES6) syntax! If you're unfamiliar, see https://babeljs.io/docs/learn-es2015/.

To add your own dependencies, use

```
npm install --save my_dependency
```

Now re-run `npm run devserver` and you should be able to `import MyDep as 'my_dependency'` now! And don't forget the `--save`, you want the package.json file to update!

Please feel free to install virtually any library/framework you want to help them complete this task (aside from, of course, a typeahead widget...) In fact, it's encouraged!

### Additional Notes

There is a `main.css` provided for you, but it is not requried that you use it. Inline styles are fine as well!

If you want to use Redux, MobX, or anything else, go for it - but it's not required.

The main.js file is your entry point. Notice that that file only includes the styling, and the example.js file. Feel free to structure your code however you see fit, but leave the main.js file as your entry point so we know what's going on.

Additionally, you can edit the index.html file in the `devserver_files` folder.

Lastly, we don't expect you to support cross browser stuff. You are free to use whatever browser you want for developing, but keep in mind we'll be using Chrome to review. (We dig the Chrome dev tools and only judge a little bit if you like something else. ;) )

### Questions/Troubleshooting

If you have any trouble setting this up, or questions about the test as a whole, feel free to email Jessica Wang at jessica@mark43.com!


## Turning it in

1. Remove your node_modules folder.
2. Make sure none of your files include your name (we do name blind grading! :))
3. Zip up the rest of the contents.
4. Name the zip file "{CURRENT_DATE}-mark43"
5. Send it over to us!

We should be able to run `npm install` and kick off the server and see your dropdown. Please don't include the node_modules folder simply because that thing will be huge compared to the code. Also, please don't publish this to github, as we don't want someone to be able to google the source code and see your answer! Your answer is probably way better than theirs anyway. You can always git commit locally to track your changes (we have a sweet .gitignore file for ya).
