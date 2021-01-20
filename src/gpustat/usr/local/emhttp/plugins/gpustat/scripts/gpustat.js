/*
  MIT License

  Copyright (c) 2020-2021 b3rs3rk

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const gpustat_status = () => {
    $.getJSON('/plugins/gpustat/gpustatus.php', (data) => {
        if(data) {
            // Nvidia Slider Bars
            $('.gpu-memclockbar').removeAttr('style').css('width', data["memclock"] / data["memclockmax"] * 100 + "%");
            $('.gpu-gpuclockbar').removeAttr('style').css('width', data["clock"] / data["clockmax"] * 100 + "%");
            $('.gpu-utilbar').removeAttr('style').css('width', data["util"]);
            $('.gpu-memutilbar').removeAttr('style').css('width', data["memutil"]);
            $('.gpu-encutilbar').removeAttr('style').css('width', data["encutil"]);
            $('.gpu-decutilbar').removeAttr('style').css('width', data["decutil"]);
            $('.gpu-fanbar').removeAttr('style').css('width', data["fan"]);
            $('.gpu-powerbar').removeAttr('style').css('width', parseInt(data["power"].replace("W","") / data["powermax"] * 100) + "%");
            $('.gpu-rxutilbar').removeAttr('style').css('width', parseInt(data["rxutil"] / data["pciemax"] * 100) + "%");
            $('.gpu-txutilbar').removeAttr('style').css('width', parseInt(data["txutil"] / data["pciemax"] * 100) + "%");

            // Intel Slider Bars
            $('.gpu-3drenderbar').removeAttr('style').css('width', data["3drender"]);
            $('.gpu-blitterbar').removeAttr('style').css('width', data["blitter"]);
            $('.gpu-videobar').removeAttr('style').css('width', data["video"]);
            $('.gpu-videnhbar').removeAttr('style').css('width', data["videnh"]);
            $('.gpu-powerutilbar').removeAttr('style').css('width', data["powerutil"]);

            // App Using Hardware
            if (data["plexusing"]) {
                $('.gpu-img-span-plex').css('display', "inline");
            } else {
                $('.gpu-img-span-plex').css('display', "none");
            }
            if (data["jellyusing"]) {
                $('.gpu-img-span-jelly').css('display', "inline");
            } else {
                $('.gpu-img-span-jelly').css('display', "none");
            }
            if (data["embyusing"]) {
                $('.gpu-img-span-emby').css('display', "inline");
            } else {
                $('.gpu-img-span-emby').css('display', "none");
            }

            $.each(data, function (key, data) {
                $('.gpu-'+key).html(data);
            })
        }
    });
};

const gpustat_dash = () => {
    // append data from the table into the correct one
    $('#db-box1').append($('.dash_gpustat').html());

    // reload toggle to get the correct state
    toggleView('dash_gpustat_toggle', true);

    // reload sorting to get the stored data (cookie)
    sortTable($('#db-box1'),$.cookie('db-box1'));
}

/*
TODO: Not currently used due to issue with default reset actually working
function resetDATA(form) {
    form.VENDOR.value = "nvidia";
    form.TEMPFORMAT.value = "C";
    form.GPUID.value = "0";
    form.DISPCLOCKS.value = "1";
    form.DISPENCDEC.value = "1";
    form.DISPTEMP.value = "1";
    form.DISPFAN.value = "1";
    form.DISPPCIUTIL.value = "1";
    form.DISPPWRDRAW.value = "1";
    form.DISPPWRSTATE.value = "1";
    form.DISPTHROTTLE.value = "1";
    form.DISPSESSIONS.value = "1";
    form.UIREFRESH.value = "1";
    form.UIREFRESHINT.value = "1000";
    form.DISPMEMUTIL.value = "1";
    form.DISP3DRENDER.value = "1";
    form.DISPBLITTER.value = "1";
    form.DISPVIDEO.value = "1";
    form.DISPVIDENH.value = "1";
    form.DISPINTERRUPT.value = "1";
}
*/