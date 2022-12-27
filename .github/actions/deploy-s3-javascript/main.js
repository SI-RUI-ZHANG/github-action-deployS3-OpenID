import * as core from '@actions/core';
import * as exec from '@actions/exec';
// import * as github from '@actions/github';

const run = () => {
    // Get inputs
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});

    // Upload files
    const s3Url = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Url} --region ${bucketRegion}`);


    core.notice('Hello from my custom JavaScript action!');
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);
};
run();