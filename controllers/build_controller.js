const simpleGit = require('simple-git');
const shell = require('shelljs');
const fs = require('fs');


const git = simpleGit({ baseDir: '/workdir' });



exports.build = function(req, res) {
  try{
    const repository = req.body.repository;

    fs.access(`/workdir/${repository.name}/`, function(error) {
      if (error) {
        git.clone(repository.clone_url)
          .then(() => console.log('finished cloning'))
          .catch((err) => console.error('failed cloning: ', err));
      }
      else {
        git.pull(repository.clone_url);
      }
    });

    shell.cd(`/workdir/${repository.name}`)
    shell.exec('img build -t p80n/build-buddy-js:foo .', function(code, stdout, stderr){
      if ( code != 0 ){
        res.status(500).json({success: false, message: stderr });
      }
      else {
    res.status(200).json({success: true});
      }

    });


  }
  catch(err)
  {
    console.log(err);
  }

};
