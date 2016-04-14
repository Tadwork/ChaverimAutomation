var chai = require('chai');
//var chaiAsPromised =  require('chai-as-promised');

// chai.Should();
// chai.use(chaiAsPromised);
var expect = require('chai').expect;
describe('loads the app', function () {

    this.timeout(300000);
	before(function (done) {
		//insert your test here
		var selector = `~begin_button`;//'new UiSelector().text("BEGIN")).className("android.widget.Button")';
		browser.waitForVisible(selector);
		browser.click(selector);
		browser.saveScreenshot('./screenshots/begin.png')
		.call(done);
	});
	describe("can enter demo mode", function () {
		before(function(done){
			browser.waitForVisible('~phone_input');
			browser.setValue('~phone_input','111');
			browser.click('~request_code_button');
			browser.saveScreenshot('./screenshots/demo.png')
			.call(done);
		})
		it("has tabs", function (done) {
			expect(browser.isVisible(`~responding`)).to.be.true;
			expect(browser.isVisible(`~calls`)).to.be.true;
			expect(browser.isVisible(`~new`)).to.be.true;
			expect(browser.isVisible(`~callerids`)).to.be.true;
			expect(browser.isVisible(`~settings`)).to.be.true;
		});
		it("has the correct login string in settings", function (done) {
			browser.click(`~settings`);
			browser.waitForVisible(`~login_text`);
			var login_text = browser.getText(`~login_text`);
			var user = {
				username: 'Fake21',
				fullname: 'Fake User'
			}
			expect(login_text).to.be.equal(`You are logged in as: ${user.username}\n${user.fullname}`)
			browser.saveScreenshot('./screenshots/settings.png')
		});
	});	
});
