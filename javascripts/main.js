(function () {
  var copyBtn = document.querySelector('#copy');
  var copiedMsg = document.querySelector('[data-copied-msg]');
  var clipboard = new Clipboard(copyBtn);
  clipboard.on('success', function () {
    copiedMsg.style.display = 'inline-block';
  });
})();

(function () {
  var shCmd = document.getElementById('sh-cmd');
  var opts = {
    ip: 'xxx.xxx.xxx.xx',
    port: '8010',
    password: '123456'
  };
  setCmd();
  var inputs = document.querySelectorAll('input[data-cmd-option]');
  Array.prototype.forEach.call(inputs, function (input) {
    // set default values
    var name = input.getAttribute('data-cmd-option');
    input.value = opts[name];
    // attach events
    input.addEventListener('keyup', function () {
      opts[name] = this.value;
      setCmd();
    });
    input.addEventListener('focus', function () {
      this.select();
    });
  });

  /**
   * set input value of #bash-cmd
   */
  function setCmd() {
    var cmdDownload = 'wget https://raw.githubusercontent.com/leeching/setup-ssserver/master/setup.sh';
    var ret = cmdDownload + ' && ' + 'sudo sh setup.sh ';
    ret += composeOpts();
    shCmd.value = ret;
  }

  /**
   * compile `opts` to string
   */
  function composeOpts() {
    var ret = [];
    for (var name in opts) {
      var value = opts[name];
      var content = '--' + name + ' ' + value;
      ret.push(content);
    }
    return ret.join(' ');
  }
})();
